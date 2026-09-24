"""
A liveness/readiness endpoint for the Docker HEALTHCHECK and, later, any
orchestrator (Kubernetes, a load balancer) that wants one. Checks the
database connection too, since "the process is running" isn't the same
as "the app can actually serve a request."
"""

from django.db import connections
from django.db.utils import OperationalError
from django.http import JsonResponse


def healthz(request):
    try:
        connections["default"].cursor()
    except OperationalError:
        return JsonResponse({"status": "error", "database": "unreachable"}, status=503)
    return JsonResponse({"status": "ok"})
