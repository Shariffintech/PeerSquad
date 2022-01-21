class StrategySerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :description, :category, :tier, :reference
end
