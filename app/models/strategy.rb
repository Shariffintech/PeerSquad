class Strategy < ApplicationRecord
    # include FastJsonapi::ObjectSerializer
    has_many :comments
    scope :strategy_comments, -> { where(:comments => { :strategy_id => self.id }) }
    accepts_nested_attributes_for :comments, reject_if: :all_blank
end
