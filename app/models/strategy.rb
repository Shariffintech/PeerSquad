class Strategy < ApplicationRecord
    include FastJsonapi::ObjectSerializer
    has_many :comments
end
