from funcion import get_table_data
from funcion import get_a_link
import mysql.connector

# 根目錄的網址
url1 = 'https://kiki.ccu.edu.tw/~ccmisp06/Course/'



links = get_a_link(url1)

# 在所有的子網址上爬取資料
for j in links:

    url = url1 + str(j)
    data = get_table_data(url)


    try:
        print("try")
        conn = mysql.connector.connect(
            host='localhost',
            port=3306,
            user='root',
            passwd='asd63254',
            db='ccu',
        )
        cur = conn.cursor()
        cur.execute("use ccu;")
        print("use ccu;")
        for row in data:
            a = "'" + row[1] + "'";
            b = "'" + row[3] + "'";
            c = "'" + row[4] + "'";
            d = "'" + row[8] + "'";
            e = "'" + row[9] + "'";
            #若有id,class_name,class_time,class_room相同的資料，則不新增
            cur.execute(f"select * from course where id = {a} and class_name = {b} and class_time = {d} and class_room = {e}")
            dd = cur.fetchone()
            if dd != None:
                continue
            command = f"INSERT INTO course (id, class_name, teacher, class_time, class_room) VALUES ( {a}, {b}, {c}, {d}, {e});"
            # print新增成功的資料
            print(command)
            cur.execute(command)
            conn.commit()
        cur.close()
    except Exception as ex:
        print(j)
        print("except:",end=" ")
        print(ex)