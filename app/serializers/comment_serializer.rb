class CommentSerializer < ActiveModel::Serializer
  attributes :title, :body, :created_at, :strategy
  belongs_to :strategy
end
