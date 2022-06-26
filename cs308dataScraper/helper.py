import random
import pandas as pd
import time
import os
import secrets


def startup_check(filename: str) -> bool:
    """
    :param filename: file name included extension
    :return True if the file exists in the current directory.
    """
    return os.path.isfile(filename) and os.access(filename, os.R_OK)

def tr_codec_corrector(text: str) -> str:
    """
    A helper function for scraping the Hurriyet website.
    """
    import sys
    sys.setrecursionlimit(5000)
    tr_chars = ["ç", "ğ", "ı", "ö", "ü", "ş", "Ç", "Ğ", "İ", "Ö", "Ş", "Ü"]
    c1252 = 0
    c1254 = 0
    try:
        return text.encode("cp1252").decode("utf_8")
    except (UnicodeDecodeError, UnicodeEncodeError) as e:
        c1252 = e.start
        try:
            return text.encode("cp1254").decode("utf_8")
        except (UnicodeDecodeError, UnicodeEncodeError) as d:
            c1254 = d.start
            i = max(c1252, c1254)
            if text[i] in tr_chars:
                return tr_codec_corrector(text[:i]) + text[i] + tr_codec_corrector(text[i+1:])
            else:
                return tr_codec_corrector(text[:i] + text[i+1:])


def wait_random() -> None:
    """Waits up to 5 seconds. Uses real randomness, not pseudo."""
    time.sleep(secrets.randbelow(4) + random.random())


class EmptyException(BaseException):
    def __init__(self):
        BaseException()
