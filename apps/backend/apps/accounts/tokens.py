"""
Stateless, signed tokens for email verification and password reset.

Verification tokens are just a signed+timestamped user id (django.core.signing),
so there's no extra DB table to manage or clean up - the signature and max_age
are all that's needed to validate them.

Password reset re-uses Django's PasswordResetTokenGenerator, which additionally
mixes in the user's password hash and last_login, so a token is invalidated the
moment the password is changed or the user logs in again.
"""

from django.conf import settings
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core import signing
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode

from .models import User

_EMAIL_VERIFICATION_SALT = "accounts.email-verification"

_password_reset_token_generator = PasswordResetTokenGenerator()


def make_email_verification_token(user: User) -> str:
    return signing.dumps({"user_id": user.pk, "email": user.email}, salt=_EMAIL_VERIFICATION_SALT)


def read_email_verification_token(token: str) -> User | None:
    max_age = getattr(settings, "EMAIL_VERIFICATION_TOKEN_MAX_AGE", 60 * 60 * 24)
    try:
        payload = signing.loads(token, salt=_EMAIL_VERIFICATION_SALT, max_age=max_age)
    except signing.BadSignature:
        return None

    try:
        user = User.objects.get(pk=payload["user_id"], email=payload["email"])
    except (User.DoesNotExist, KeyError):
        return None
    return user


def make_password_reset_token(user: User) -> tuple[str, str]:
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    token = _password_reset_token_generator.make_token(user)
    return uid, token


def read_password_reset_token(uid: str, token: str) -> User | None:
    try:
        user_id = force_str(urlsafe_base64_decode(uid))
        user = User.objects.get(pk=user_id)
    except (User.DoesNotExist, ValueError, TypeError, OverflowError):
        return None

    if not _password_reset_token_generator.check_token(user, token):
        return None
    return user
