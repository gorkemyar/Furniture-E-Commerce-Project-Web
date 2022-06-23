from pydantic import BaseSettings
import os
from dotenv import load_dotenv

load_dotenv()

DEBUG = os.getenv("DEBUG", "False").lower() in ("true", "1", "t")


if DEBUG:
    BASE_URL = os.getenv("DEVELOPMENT_URL")
else:
    BASE_URL = os.getenv("PRODUCTION_URL")


class Settings(BaseSettings):
    DEBUG: bool = DEBUG
    TESTING: bool = os.getenv("TESTING", "False").lower() in ("true", "1", "t")

    APP_NAME: str = "urdan"
    APP_DESCRIPTION: str = "Furniture eCommerce"
    SECRET_KEY: str = os.getenv("SECRET_KEY")

    CURRENT_API_VERSION: str = os.getenv("CURRENT_API_VERSION")
    CURRENT_VERSION_LOGIN_URL: str = os.getenv("CURRENT_VERSION_LOGIN_URL")

    BASE_URL: str = BASE_URL
    API_URL: str = BASE_URL + str(CURRENT_API_VERSION)
    API_V1_STR: str = "/api/v1"

    MEDIA_FOLDER: str = os.getenv("MEDIA_FOLDER", "static")

    ACCESS_TOKEN_EXPIRE_MINUTES: int = os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 3600)

    DATABASE_URL: str = os.getenv("DATABASE_URL")
    DB_URL: str = f"{DATABASE_URL}_test" if TESTING else str(DATABASE_URL)
    PDF_PACKAGE: str = os.getenv("PDF_PACKAGE")

    DB_NAME: str = os.getenv("DB_NAME")
    CELERY_BROKER_URL: str = os.getenv("CELERY_BROKER_URL")
    CELERY_RESULT_BACKEND: str = os.getenv("CELERY_RESULT_BACKEND")

    TEST_SUPERUSER_EMAIL: str = os.getenv("TEST_SUPERUSER_EMAIL")
    TEST_USER_EMAIL: str = os.getenv("TEST_USER_EMAIL")
    TEST_USER_PASSWORD: str = os.getenv("TEST_USER_PASSWORD")

    CRYPTO_ALGORITHM: str = os.getenv("CRYPTO_ALGORITHM", "HS256")
    HASH_KEY: str = os.getenv("HASH_KEY")


settings = Settings()
