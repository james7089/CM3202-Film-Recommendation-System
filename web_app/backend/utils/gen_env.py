""" 
This script generates new secrets for access and refresh tokens, a bcrypt password salt, and updates the local .env file. 
"""

from pathlib import Path
from secrets import token_bytes
from base64 import b64encode
import bcrypt

def update_env(env_content, target, value):
    start = env_content.find(target) + len(target)
    prefix, postfix = env_content[:start], env_content[start:]
    end = postfix.find('"')
    return prefix + value + postfix[end:]

def generate_token():
    return str(b64encode(token_bytes(64)).decode())[2:-1]

def generate_salt():
    return str(bcrypt.gensalt(10))[2:-1]

path = Path.cwd() / ".env"
env = path.read_text()

env = update_env(env, 'ACCESS_TOKEN_SECRET="', generate_token())
env = update_env(env, 'REFRESH_TOKEN_SECRET="', generate_token())
env = update_env(env, 'SALT="', generate_salt())

with path.open("w") as out:
    out.write(env)