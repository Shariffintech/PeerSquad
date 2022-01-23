class Strategy < ApplicationRecord
  
    has_many :comments, dependent: :destroy, foreign_key: :strategy_id
    scope :strategy_comments, -> { where(:comments => { :strategy_id => self.id }) }
    accepts_nested_attributes_for :comments, reject_if: :all_blank
end
