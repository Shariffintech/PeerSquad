class CreateStrategies < ActiveRecord::Migration[6.1]
  def change
    create_table :strategies do |t|
      t.string :name
      t.string :category
      t.integer :tier
      t.string :description
      t.string :reference
      t.timestamps
    end
  end
end
