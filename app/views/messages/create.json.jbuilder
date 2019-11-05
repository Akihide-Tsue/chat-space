json.content @message.content
json.user_id @message.user.id
json.image @message.user.name
json.user_name @message.user.name
json.date @message.created_at.strftime("%Y/%m/%d %H:%M")