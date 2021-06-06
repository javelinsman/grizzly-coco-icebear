from selenium import webdriver
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException
import os
import time
import pyperclip
import random
import json

class Article():
    def __init__(self, id, title_category, title, author, date, contents=[]):
        self.id = id
        self.title_category = title_category
        self.title = title
        self.author = author
        self.date = date
        self.contents = contents
    
    def as_dict(self):
        return {
            "id": self.id,
            "title_category": self.title_category,
            "title": self.title,
            "author": self.author,
            "date": self.date,
            "contents": self.contents,
        }
    def __repr__(self):
        return "Article(title='%s', author='%s', date='%s', contents=%r)" % (self.title, self.author, self.date, self.contents)


class Naver():
    def __init__(self, driver):
        self.driver = driver

    def copy_input(self, xpath, input):
        pyperclip.copy(input)
        self.driver.find_element_by_xpath(xpath).click()
        ActionChains(self.driver).key_down(Keys.COMMAND).send_keys('v').key_up(Keys.COMMAND).perform()
        time.sleep(1)
        
    def login(self, id, pw):
        '로그인'
        self.driver.get('https://nid.naver.com/nidlogin.login') # 로그인 페이지.
        self.driver.find_element_by_xpath('//*[@id="id"]').send_keys(id)
        time.sleep(2)
        self.copy_input('//*[@id="pw"]', pw)
        time.sleep(2)
        self.driver.find_element_by_xpath('//*[@id="log.login"]').click() # 로그인 버튼 클릭.
        
    def cafe(self, idx, nickname):
        time.sleep(10)
        print(f'cafe {idx}, {nickname} ')
        cafe_name = 'any_name'
        self.driver.get(f'http://cafe.naver.com/{cafe_name}') # 카페 메인 페이지.
        self.driver.find_element_by_xpath('//*[@id="topLayerQueryInput"]').send_keys(nickname) # 검색어 입력.
        self.driver.find_element_by_xpath('//*[@id="info-search"]/form/button').click() # 검색 버튼 클릭.

        # # 컨텐츠는 iframe 안에 있으므로, 컨텍스트를 바꾼다.
        iframe = self.driver.find_element_by_xpath('//*[@id="cafe_main"]')
        self.driver.switch_to.frame("cafe_main")
        self.driver.find_element_by_xpath('//*[@id="currentSearchByTop"]').click()
        self.driver.find_element_by_xpath('//*[@id="sl_general"]/li[3]/a').click()
        self.driver.find_element_by_xpath('//*[@id="main-area"]/div[1]/div[1]/form/div[4]/button').click()
        page_links = self.driver.find_elements_by_css_selector('div.prev-next > a')
        str_links = []

        
        for link in page_links:
            str_link = link.get_attribute('href')
            str_links.append(str_link)

        for link in str_links:
            self.driver.get(link)
            iframe = self.driver.find_element_by_xpath('//*[@id="cafe_main"]')
            self.driver.switch_to.frame("cafe_main")
            rows = self.driver.find_elements_by_css_selector('#main-area > div:nth-child(7) > table > tbody > tr div.inner_number')
            numbers = []
            for row in rows:
                number = row.get_attribute('innerText')
                numbers.append(number)

            for number in numbers:
                self.driver.get(f'http://cafe.naver.com/{cafe_name}/{number}')
                self.driver.implicitly_wait(5)
                self.driver.switch_to.frame("cafe_main")
                self.driver.find_elements_by_css_selector('div.Article')
                contents_span = self.driver.find_elements_by_css_selector('.se-module-text > p > span')
                date = self.driver.find_element_by_css_selector('div.article_info > span.date').get_attribute('innerText')
                author = self.driver.find_element_by_css_selector('div.profile_info > div.nick_box > a.nickname').get_attribute('innerText')
                if (author != nickname):
                    time.sleep(random.randint(5, 10))
                    continue
                try:
                    title_category = self.driver.find_element_by_css_selector('div.title_category > em.category_text').get_attribute('innerText')
                except NoSuchElementException:
                    title_category = '[]'
                title = self.driver.find_element_by_css_selector('div.title_area > h3.title_text').get_attribute('innerText')
                contents = []
                for content in contents_span:
                    contents.append(content.get_attribute('innerText'))
                article = Article(number, title_category, title, author, date, contents)
                with open(f"{idx}_{number}.json", 'w') as f:
                        f.write(json.dumps(article.as_dict()))

                time.sleep(random.randint(5, 10))

            self.driver.switch_to.default_content()
            self.driver.implicitly_wait(1)
            


if __name__ == "__main__":
    chrome = webdriver.Chrome('./chromedriver')
    naver = Naver(driver=chrome)
    id='your_id'
    pw='your_pw'
    naver.login(id=id, pw=pw)
    nicknames = [
        'nickname_01',
        'nickname_02' #any nickname you want to crawl
        ]
    for idx, nickname in enumerate(nicknames):
        naver.cafe(idx=f'P{idx}',nickname=nickname)
    