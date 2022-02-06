class CommentSerializer < ActiveModel::Serializer
  attributes :title, :body, :created_at, :strategy, :id
  belongs_to :strategy
end
