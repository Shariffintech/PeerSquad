Strategy.destroy_all

comment_1 = Comment.create(title: "This is a test comment", body: "This is the body of the comment", strategy_id: 1)
comment_2 = Comment.create(title: "This is a another test comment", body: "This is the body of the comment 2", strategy_id: 2)
comment_3 = Comment.create(title: "This is a third test comment", body: "body of the comment 3", strategy_id: 3)

Strategy.create([
    {   name: "Calm down counting", 
        category: "Academics", 
        description: "Count to 10 and ask child to calm down", 
        reference:"Floyd, D. (2017). The Future of Education: The Role of Technology in the 21st Century. Retrieved from https://www.nytimes.com/2017/04/12/education/the-future-of-education-the-role-of-technology-in-the-21st-century.html", 
        tier: 1,
        comments: [comment_1]
    },
    {
        
        name: "Develop a positive attitude",
        category: "Developmental",
        description: "Develop a positive attitude",
        reference:"Ralph, J. (2017). Positive Attitude: The Power of Positive Thinking. Retrieved from https://www.amazon.com/Positive-Attitude-Power-Thinking-ebook/dp/B071JZQWQW/ref=sr_1_1?ie=UTF8&qid=1524098982&sr=8-1&keywords=positive+attitude",
        tier: 1,
        comments: [comment_2]
    },
    {   
        name: "Read aloud",
        category: "Literacy",
        description: "Read aloud",
        reference:"Tom, R. (2017). Reading aloud: How to improve reading comprehension. Retrieved from https://www.amazon.com/Reading-Aloud-Improving-Reading-Comprehension-ebook/dp/B071JZQWQW/ref=sr_1_1?ie=UTF8&qid=1524098982&sr=8-1&keywords=reading+aloud",
        tier: 1,
        comments: [comment_3]
    },
])

p "Created #{Strategy.count} strategies"