Strategy.destroy_all

comment_1 = Comment.create(title: "This is a test comment", body: "This is the body of the comment", strategy_id: 1)
comment_2 = Comment.create(title: "This is a another test comment", body: "This is the body of the comment 2", strategy_id: 2)
comment_3 = Comment.create(title: "This is a third test comment", body: "body of the comment 3", strategy_id: 3)
comment_4 = Comment.create(title: "This is a fourth test comment", body: "body of the comment 4", strategy_id: 4)
comment_5 = Comment.create(title: "This is a fifth test comment", body: "body of the comment 5", strategy_id: 5)
comment_6 = Comment.create(title: "This is a sixth test comment", body: "body of the comment 6", strategy_id: 6)
comment_7 = Comment.create(title: "This is a seventh test comment", body: "body of the comment 7", strategy_id: 7)
comment_8 = Comment.create(title: "This is a eighth test comment", body: "body of the comment 8", strategy_id: 8)
comment_9 = Comment.create(title: "This is a ninth test comment", body: "body of the comment 9", strategy_id: 9)
comment_10 = Comment.create(title: "This is a tenth test comment", body: "body of the comment 10", strategy_id: 10)


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
    {
        name: "Read silently",
        category: " Literacy",
        description: "Read quietly",
        reference:"Tom, R. (2017). Reading aloud: How to improve reading comprehension. Retrieved from https://www.amazon.com/Reading-Aloud-Improving-Reading-Comprehension-ebook/dp/B071JZQWQW/ref=sr_1_1?ie=UTF8&qid=1524098982&sr=8-1&keywords=reading+aloud",
        tier: 2,
        comments: [comment_4]
    },
    { 
        name: "Walk without stomping",
        category: "Developmental",
        description: "Walk without stomping",
        reference:"Tom, R. (2017). Reading aloud: How to improve reading comprehension. Retrieved from https://www.amazon.com/Reading-Aloud-Improving-Reading-Comprehension-ebook/dp/B071JZQWQW/ref=sr_1_1?ie=UTF8&qid=1524098982&sr=8-1&keywords=reading+aloud",
        tier: 3,
        comments: [comment_5]
    },
    {
        name: "Walk with a partner",
        category: "Social",
        description: "Walk with a partner",
        reference:"Tom, R. (2017). Reading aloud: How to improve reading comprehension. Retrieved from https://www.amazon.com/Reading-Aloud-Improving-Reading-Comprehension-ebook/dp/B071JZQWQW/ref=sr_1_1?ie=UTF8&qid=1524098982&sr=8-1&keywords=reading+aloud",
        tier: 3,
        comments: [comment_6]
    },
    {
        name: "Walk alone",
        category: "Social",
        description: "Walk alone",
        reference:" Malcom Gladwell, The 7 Habits of Highly Effective People (2015). Retrieved from https://www.amazon.com/7-Habits-Highly-Effective-People-ebook/dp/B00B7ZQXZ6/ref=sr_1_1?ie=UTF8&qid=1524098982&sr=8-1&keywords=7+habits",
        tier: 4,
        comments: [comment_7]
    },

    {
        name: "count to 1000",
        category: "Academics",
        description: "Count to 1000",
        reference:"Floyd, D. (2017). The Future of Education: The Role of Technology in the 21st Century. Retrieved from https://www.nytimes.com/2017/04/12/education/the-future-of-education-the-role-of-technology-in-the-21st-century.html",
        tier: 4,
        comments: [comment_8]
    },

    {
        name: "reading in german",
        category: "Literacy",
        description: "reading in german",
        reference:"Tom, R. (2017). Reading aloud: How to improve reading comprehension. Retrieved from https://www.amazon.com/Reading-Aloud-Improving-Reading-Comprehension-ebook/dp/B071JZQWQW/ref=sr_1_1?ie=UTF8&qid=1524098982&sr=8-1&keywords=reading+aloud",
        tier: 4,
        comments: [comment_9]
    },

    {
        name: " Meditate over temper tantrum",
        category: "Social Emotional",
        description: "Meditate over temper tantrum",
        reference: "Meditation for children. Retrieved from https://www.amazon.com/Meditation-Children-ebook/dp/B00B7ZQXZ6/ref=sr_1_1?ie=UTF8&qid=1524098982&sr=8-1&keywords=7+habits",
        tier: 4,
        comments: [comment_10]
    }

])

p "Created #{Strategy.count} strategies"