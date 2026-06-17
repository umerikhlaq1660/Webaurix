from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    # App
    environment: str = "development"
    company_name: str = "Webaurix"
    owner_email: str = "umerikhlaq160@gmail.com"
    frontend_url: str = "http://localhost:3000"
    aria_secret_code: str = "WEBAURIX"

    # Database
    database_url: str

    # Redis
    redis_url: str

    # Security
    secret_key: str
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 1440

    # AI
    anthropic_api_key: str
    anthropic_model: str = "claude-sonnet-4-6"
    openai_api_key: str = ""
    embedding_model: str = "text-embedding-3-small"
    embedding_dimensions: int = 1536
    memory_top_k: int = 8          # how many memories to retrieve per query
    max_history_messages: int = 20  # conversation history window

    # Gmail
    gmail_client_id: str = ""
    gmail_client_secret: str = ""
    gmail_refresh_token: str = ""
    gmail_sender_email: str = ""

    # WhatsApp
    whatsapp_token: str = ""
    whatsapp_phone_number_id: str = ""
    whatsapp_verify_token: str = ""

    # Google Calendar
    google_calendar_id: str = "primary"
    google_service_account_json: str = "{}"

    @property
    def is_production(self) -> bool:
        return self.environment == "production"


@lru_cache
def get_settings() -> Settings:
    return Settings()
