import json

id_set = []  # 用户集合，用户id在该集合中唯一存在
article_id_set = []     #同理
user_list = {}  # 用户信息
article_list = {}  # 文章信息
article_list_temp = {} #储存不同类别的文章信息

for i in range(25):
    path = "../../static/resource/响应返回的json数据/"+str(i)+".json"
    with open(path, "r", encoding='utf-8') as f:
        js_lst = json.load(f)
    key = js_lst["data"][0]["category"]["category_url"]
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
            article_info["collect_count"] = article_dic["collect_count"]  # 天数
            article_info["cover_image"] = article_dic["cover_image"]  # 文章的封面图片地址
            article_info["title"] = article_dic["title"]  # 文章标题
            article_info["view_count"] = article_dic["view_count"]  # 文章浏览数
            article_info["tag_ids"] = article_dic["tag_ids"]  # 文章的小分类标签id
            article_info["category_name"] = item["category"]["category_name"]  # 文章的大分类名
            article_info["category_id"] = item["category"]["category_id"]  # 文章的大分类id
            article_info["category_url"] = item["category"]["category_url"]  # 文章的大分类url
            article_list[article_info["article_id"]] = article_info
            article_list_temp[article_info["article_id"]] = article_info

        if info_dic["user_id"] not in id_set:  # 检查id来判断该作者信息是否已经被读取
            id_set.append(info_dic["user_id"])  # id
            user_info = {}  # 存储提取后作者信息的字典
            user_info["name"] = info_dic["user_name"]  # 用户名
            user_info["avatar_large"] = info_dic["avatar_large"] #用户头像网址
            user_info["company"] = info_dic["company"]  # 所在公司
            user_info["job"] = info_dic["job_title"]  # 职业
            user_info["level"] = info_dic["level"]  # 用户等级
            user_info["descrip"] = info_dic["description"]  # 个人简介
            user_info["fans"] = info_dic["followee_count"]  # 粉丝数
            user_info["stars"] = info_dic["follower_count"]  # 关注数
            user_info["all_articles"] = info_dic["post_article_count"]  # 原创文章数
            user_info["all_get_like"] = info_dic["got_digg_count"]  # 总点赞数
            user_info["all_views"] = info_dic["got_view_count"]  # 文章总浏览量
            user_list[info_dic["user_id"]] = user_info  # 将该用户的信息加入到用户列表


    with open("../../static/resource/json/"+key+".json", 'a', encoding='utf-8') as file_obj:
        json.dump(article_list_temp, file_obj, ensure_ascii=False, indent=4)
    article_list_temp.clear()

with open("../../static/resource/json/all_article_info.json", 'w', encoding='utf-8') as file_obj:
    json.dump(article_list, file_obj, ensure_ascii=False ,indent=4)
with open("../../static/resource/json/all_user_info.json", 'w', encoding='utf-8') as file_obj:
    json.dump(user_list, file_obj, ensure_ascii=False, indent=4)