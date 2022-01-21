class CommentSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :body, :created_at, :strategy
  belongs_to :strategy
end
