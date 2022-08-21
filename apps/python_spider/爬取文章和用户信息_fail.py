# -*- coding = utf-8 -*-
import json
import requests
from lxpy import copy_headers_dict

i = 1
id_set = []  # 用户集合，用户id在该集合中唯一存在
article_id_set = []     #同理
user_list = []  # 用户信息
article_list = []  # 文章信息
article_list_temp = [] #储存不同类别的文章信息
cate_dict = {  # 文章标签id
    "安卓": "6809635626879549454",
    "人工智能": "6809637773935378440",
    "IOS": "6809635626661445640",
    "后端": "6809637769959178254",
    "前端": "6809637767543259144",
    "开发工具":"6809637771511070734",
    "代码人生":"6809637776263217160",
    "阅读":"6809637772874219534"
}

# 目标url
tar_url = r"https://api.juejin.cn/recommend_api/v1/article/recommend_cate_feed"

# POST参数
post = {
    "id_type":2,
    'cate_id':'6809637769959178254',
    "client_type":2608,
    "sort_type":200,
    "cursor":"0",  # 控制分页(没有效果)
    "limit":20
}

header = {
    "User-Agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 '
                  '(KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
    "accept-encoding": "gzip",
    "accept-language": "zh-CN,zh;q=0.9",
    "content-length": "85",
    "content-type": "application/json"
}
for key in list(cate_dict.keys()):
    cate_id = cate_dict[key]
    post["cate_id"] = cate_id
    for page in range(2):
        post["cursor"] = str(page)
        res = requests.post(tar_url, data=json.dumps(post), headers=header)
        js_lst = res.json()  # 将json格式的字符串转为字典
        for item in js_lst["data"]:  # 遍历每一篇文章
            info_dic = item["author_user_info"]  # 作者信息存储的字典
            article_dic = item["article_info"]
            if article_dic["article_id"] not in article_id_set:
                article_id_set.append(article_dic["article_id"])
                article_info = {}
                article_info["user_id"] = article_dic["user_id"]  # 用户id
                article_info["article_id"] = article_dic["article_id"]  # 文章的id
                article_info["brief_content"] = article_dic["brief_content"]  # 文章的梗概
                article_info["comment_count"] = article_dic["comment_count"]  # 评论数
                article_info["digg_count"] = article_dic["digg_count"]  # 点赞数
                article_info["cover_image"] = article_dic["cover_image"]  # 文章的封面图片地址
                article_info["title"] = article_dic["title"]  # 文章标题
                article_info["view_count"] = article_dic["view_count"]  # 文章浏览数
                article_info["tag_ids"] = article_dic["tag_ids"]  # 文章的小分类标签id
                article_info["category_name"] = item["category"]["category_name"]  # 文章的大分类名
                article_info["category_id"] = item["category"]["category_id"]  # 文章的大分类id
                article_info["category_url"] = item["category"]["category_url"]  # 文章的大分类url
                article_list.append(article_info)
                article_list_temp.append(article_info)

            if info_dic["user_id"] not in id_set:  # 检查id来判断该作者信息是否已经被读取
                id_set.append(info_dic["user_id"])  # id
                user_info = {}  # 存储提取后作者信息的字典
                user_info["id"] = info_dic["user_id"]  # id
                user_info["name"] = info_dic["user_name"]  # 用户名
                user_info["company"] = info_dic["company"]  # 所在公司
                user_info["job"] = info_dic["job_title"]  # 职业
                user_info["level"] = info_dic["level"]  # 用户等级
                user_info["descrip"] = info_dic["description"]  # 个人简介
                user_info["fans"] = info_dic["followee_count"]  # 粉丝数
                user_info["stars"] = info_dic["follower_count"]  # 关注数
                user_info["all_articles"] = info_dic["post_article_count"]  # 原创文章数
                user_info["all_get_like"] = info_dic["got_digg_count"]  # 总点赞数
                user_info["all_views"] = info_dic["got_view_count"]  # 文章总浏览量
                user_list.append(user_info)  # 将该用户的信息加入到用户列表

            # print("成功爬取并处理第"+str(i)+"条数据......")
            # i+=1

    with open("../../static/json/"+key+"_article_info.json", 'w', encoding='utf-8') as file_obj:
        json.dump(article_list_temp, file_obj, ensure_ascii=False, indent=4)
    article_list_temp.clear()

with open("../../static/resource/json/all_article_info.json", 'w', encoding='utf-8') as file_obj:
    json.dump(article_list, file_obj, ensure_ascii=False ,indent=4)
with open("../../static/resource/json/all_user_info.json", 'w', encoding='utf-8') as file_obj:
    json.dump(user_list, file_obj, ensure_ascii=False, indent=4)
