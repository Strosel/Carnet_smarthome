import sys
import logging
import pymysql
import json
import time

host  = ""
name = ""
password = ""
db_name = ""
tablename = ""
index = -1
port = 3306


logger = logging.getLogger()
logger.setLevel(logging.INFO)

def handler(event, context):
    try:
        conn = pymysql.connect(host, user=name, passwd=password, db=db_name, connect_timeout=300, port=port)
    except:
        logger.error("ERROR: Unexpected error: Could not connect to MySql instance.")
        sys.exit()

    logger.info("SUCCESS: Connection to RDS mysql instance succeeded")

    status = {}

    with conn.cursor() as cur:
        cur.execute("select * from {} ORDER BY statustime DESC".format(tablename))
        entries = cur.fetchall()
        ts = entries[0][index]
        cur.execute("select window_front from {} where statustime = {}".format( tablename, ts))
        status['window_front'] = cur.fetchone()[0]
        cur.execute("select window_rear from {} where statustime = {}".format( tablename, ts))
        status['window_rear'] = cur.fetchone()[0]
        cur.execute("select heat from {} where statustime = {}".format( tablename, ts))
        status['heat'] = cur.fetchone()[0]
        cur.execute("select battery from {} where statustime = {}".format( tablename, ts))
        status['battery'] = cur.fetchone()[0]
        cur.execute("select dist from {} where statustime = {}".format( tablename, ts))
        status['dist'] = cur.fetchone()[0]
        cur.execute("select charging from {} where statustime = {}".format( tablename, ts))
        status['charging'] = cur.fetchone()[0]
        cur.execute("select address from {} where statustime = {}".format( tablename, ts))
        status['address'] = cur.fetchone()[0]
        cur.execute("select locked from {} where statustime = {}".format( tablename, ts))
        status['locked'] = cur.fetchone()[0]
        status['statustime'] = ts
        cur.close()
    conn.close
    return {
        "isBase64Encoded": False,
        "statusCode": 200,
        "headers": {},
        "body":json.dumps(status)
    }
