from dataclasses import dataclass
from typing import Optional


@dataclass
class User:
    username: str
    first_name: str
    last_name: str
    email: str
    password: str
    about_me: Optional[str]
    fb_link: Optional[str]
    li_link: Optional[str]
    tw_link: Optional[str]
    yt_link: Optional[str]
    avatar: Optional[str]

    def __init__(
            self,
            username: str,
            first_name: str,
            last_name: str,
            email: str,
            password: str,
            about_me: Optional[str] = None,
            fb_link: Optional[str] = None,
            li_link: Optional[str] = None,
            tw_link: Optional[str] = None,
            yt_link: Optional[str] = None,
            avatar: Optional[str] = None
    ):
        self.username = username
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password = password
        self.about_me = about_me
        self.fb_link = fb_link
        self.li_link = li_link
        self.tw_link = tw_link
        self.yt_link = yt_link
        self.avatar = avatar
