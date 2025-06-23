
import os
from telethon.sync import TelegramClient
from supabase import create_client, Client
import asyncio
import hashlib

SUPABASE_URL = "https://lspxkkmimlxxzfsdoabo.supabase.co"
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_KEY")
TELEGRAM_API_ID = 22063942
TELEGRAM_API_HASH = "d60e100b837ecf58a1a82bb35f3b86c7"
SESSION_NAME = "kavkaz_monitor_session"

assert SUPABASE_KEY, "SUPABASE_SERVICE_KEY not set"

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

client = TelegramClient(SESSION_NAME, TELEGRAM_API_ID, TELEGRAM_API_HASH)

async def fetch_and_store_posts():
    await client.start()
    print("Telegram client started")

    response = supabase.table("sources").select("*").eq("type", "telegram").execute()
    sources = response.data

    for source in sources:
        url = source.get("url")
        if not url:
            continue
        channel_name = url.split("/")[-1]
        try:
            async for message in client.iter_messages(channel_name, limit=5):
                if not message.message:
                    continue
                text = message.message
                date = message.date.isoformat()
                link = f"https://t.me/{channel_name}/{message.id}"

                # Check for existing post by link
                existing = supabase.table("posts").select("id").eq("link", link).execute()
                if existing.data:
                    continue

                post_data = {
                    "text": text,
                    "created_at": date,
                    "link": link,
                    "source_id": None  # optionally resolve from source['id']
                }
                supabase.table("posts").insert(post_data).execute()
                print(f"Saved post from {channel_name}: {text[:30]}...")
        except Exception as e:
            print(f"Error fetching {channel_name}: {e}")

    await client.disconnect()

if __name__ == "__main__":
    asyncio.run(fetch_and_store_posts())
