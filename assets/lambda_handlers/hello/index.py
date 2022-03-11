from loguru import logger


def handler(event, context):
    logger.info('hello world!')
    return {
        "status_code": 200,
        "headers": {"Content-Type": "application/json"},
        "body": "Hello world!"
    }
