"""
Throttle scopes for endpoints that are prime automated-abuse targets
(credential stuffing on login, mass account creation on signup, and
password-reset/verification-email spam). Rates are set in
REST_FRAMEWORK["DEFAULT_THROTTLE_RATES"] per settings/base.py.
"""

from rest_framework.throttling import SimpleRateThrottle


class ScopedIPRateThrottle(SimpleRateThrottle):
    """Throttles by client IP regardless of authentication state."""

    def get_cache_key(self, request, view):
        return self.cache_format % {
            "scope": self.scope,
            "ident": self.get_ident(request),
        }


class SignupRateThrottle(ScopedIPRateThrottle):
    scope = "signup"


class LoginRateThrottle(ScopedIPRateThrottle):
    scope = "login"


class PasswordResetRateThrottle(ScopedIPRateThrottle):
    scope = "password_reset"


class EmailVerificationRateThrottle(ScopedIPRateThrottle):
    scope = "email_verification"
