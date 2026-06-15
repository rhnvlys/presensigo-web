"""Vercel serverless entrypoint for PRESENSIGO FastAPI application."""

from app.main import app  # noqa: F401

handler = app
