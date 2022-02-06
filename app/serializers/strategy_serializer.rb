class StrategySerializer < ActiveModel::Serializer
  attributes :name, :description, :category, :tier, :reference, :id
  has_many :comments
end
