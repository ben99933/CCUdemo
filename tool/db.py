from funcion import get_table_data
from funcion import get_a_link
import mysql.connector


# 根目錄的網址
url1 = 'https://kiki.ccu.edu.tw/~ccmisp06/Course/'

try:
    conn = mysql.connector.connect(
        host='localhost',
        port=3306,
        user='root',
        passwd='asd63254',
        db='ccu',
    )
    cur = conn.cursor()
    cur.execute("use ccu;")
except Exception as ex:
    print("connect error",end=" ")
    print(ex)

totally_correct = 0
totally_error = 0
error_message = []

links = get_a_link(url1)


# 在所有的子網址上爬取資料
for j in links:

    url = url1 + str(j)
    data = get_table_data(url)
    correct_num = int(0)
    error_num = int(0)
    for row in data:
        a = "'" + row[1] + "'";
        b = "'" + row[3] + "'";
        c = "'" + row[4] + "'";
        d = "'" + row[8] + "'";
        e = "'" + row[9] + "'";
        if j == "I001.html":
            a = "'" + row[2] + "'";
            b = "'" + row[4] + "'";
            c = "'" + row[5] + "'";
            d = "'" + row[9] + "'";
            e = "'" + row[10] + "'";
        try:
            #若有id,class_name,class_time,class_room相同的資料，則不新增
            cur.execute(f"select * from course where id = {a} and class_name = {b} and class_time = {d} and class_room = {e}")
            dd = cur.fetchone()
            if dd != None:
                continue
            command = f"INSERT INTO course (id, class_name, teacher, class_time, class_room) VALUES ( {a}, {b}, {c}, {d}, {e});"
            cur.execute(command)
            conn.commit()
            # print新增成功的資料
            print(command)
            correct_num += 1
        except Exception as ex:
            print("except:",end=" ")
            print(ex)
            error_num += 1
    print(f"link:{j}",end=" ")
    print(f"correct_num:{correct_num} error_num:{error_num}",end=" ")
    totally_correct += correct_num
    totally_error += error_num
    if(error_num > 0):
        print(f"   error link {url}")
        error_message.append([url,error_num])
    else:
        print("")
cur.close()

print(f"totally_correct:{totally_correct} totally_error:{totally_error}")
for num,i in enumerate(error_message):
    print(f"{num + 1}: error_link:{i[0]} error_num:{i[1]}")
