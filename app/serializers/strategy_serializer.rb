class StrategySerializer < ActiveModel::Serializer
  attributes :name, :description, :category, :tier, :reference
  has_many :comments
end
