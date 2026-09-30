import logging

from celery import shared_task
from django.conf import settings
from django.core.mail import send_mail

from .models import User
from .tokens import make_email_verification_token, make_password_reset_token

logger = logging.getLogger(__name__)


@shared_task
def send_verification_email(user_id: int) -> None:
    try:
        user = User.objects.get(pk=user_id)
    except User.DoesNotExist:
        logger.warning("send_verification_email: no user with id=%s", user_id)
        return

    if user.is_verified:
        return

    token = make_email_verification_token(user)
    verify_url = f"{settings.FRONTEND_URL}/verify-email?token={token}"

    send_mail(
        subject="Verify your Celluloid email address",
        message=(
            f"Hi{f' {user.name}' if user.name else ''},\n\n"
            "Confirm your email address to finish setting up your Celluloid account:\n"
            f"{verify_url}\n\n"
            "This link expires in 24 hours. If you didn't create this account, "
            "you can ignore this email."
        ),
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[user.email],
    )


@shared_task
def send_password_reset_email(user_id: int) -> None:
    try:
        user = User.objects.get(pk=user_id)
    except User.DoesNotExist:
        logger.warning("send_password_reset_email: no user with id=%s", user_id)
        return

    uid, token = make_password_reset_token(user)
    reset_url = f"{settings.FRONTEND_URL}/reset-password?uid={uid}&token={token}"

    send_mail(
        subject="Reset your Celluloid password",
        message=(
            f"Hi{f' {user.name}' if user.name else ''},\n\n"
            "We received a request to reset your Celluloid password. "
            f"Choose a new one here:\n{reset_url}\n\n"
            "This link expires shortly. If you didn't request this, you can "
            "ignore this email - your password won't change."
        ),
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[user.email],
    )
