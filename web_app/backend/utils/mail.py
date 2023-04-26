"""
Mail server config
"""

from fastapi_mail import FastMail, ConnectionConfig, MessageSchema

from core.config import settings

mail_conf = ConnectionConfig(
    MAIL_USERNAME=settings.MAIL_USERNAME,
    MAIL_PASSWORD=settings.MAIL_PASSWORD,
    MAIL_FROM=settings.MAIL_SENDER,
    MAIL_PORT=settings.MAIL_PORT,
    MAIL_SERVER=settings.MAIL_SERVER,
    MAIL_TLS=True,
    MAIL_SSL=False,
    USE_CREDENTIALS=True,
)

mail = FastMail(mail_conf)


async def send_verification_email(email: str, token: str):
    """Send user verification email"""
    # Change this later to public endpoint
    url = settings.root_url + "/mail/verify/" + token
    if settings.mail_console:
        print("POST to " + url)
    else:
        message = MessageSchema(
            recipients=[email],
            subject="MyServer Email Verification",
            body="Welcome to MyServer! We just need to verify your email to begin: "
            + url,
        )
        await mail.send_message(message)


async def send_password_reset_email(email: str, token: str):
    """Sends password reset email"""
    # Change this later to public endpoint
    url = settings.root_url + "/register/reset-password/" + token
    if settings.mail_console:
        print("POST to " + url)
    else:
        message = MessageSchema(
            recipients=[email],
            subject="MyServer Password Reset",
            body=f"Click the link to reset your MyServer account password: {url}\nIf you did not request this, please ignore this email",
        )
        await mail.send_message(message)
