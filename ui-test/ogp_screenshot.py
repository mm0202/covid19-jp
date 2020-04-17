import os
import time

from selenium import webdriver

if not os.path.exists("ogp"):
    os.mkdir("ogp")

PATHS = {
    "/?dummy": (959, 500),
    "cards/inspection-and-positive-situation": (959, 480),
    "cards/the-day-before-ratio": (959, 480),
    "cards/graph-card-of-all-patients": (959, 480),
    "cards/graph-card-of-inspection-persons": (959, 480),
    "cards/graph-card-of-discharge": (959, 480),
    "cards/graph-card-of-dead": (959, 480),
    "cards/positive-cases-attributes": (959, 480)
}

options = webdriver.ChromeOptions()
options.add_argument("--headless")
options.add_argument("--hide-scrollbars")

driver = webdriver.Chrome(options=options)

lang = "ja"
# for lang in ("ja", "en", "zh-cn", "zh-tw", "ko", "ja-basic"):
if not os.path.exists("ogp/{}".format(lang)):
    os.mkdir("ogp/{}".format(lang))
for path, size in PATHS.items():
    driver.set_window_size(*size)
    driver.get(
        "http://localhost:8000{}?ogp=true".format(
            path if lang == "ja" else "/{}{}".format(lang, path)
        )
    )
    path = path.replace("/cards/", "").replace("/", "_")
    if ('heatmap' in path):
        time.sleep(20)
    driver.save_screenshot(
        "ogp/{}.png".format(
            path if lang == "ja" else "{}/{}".format(lang, path)
        )
    )
