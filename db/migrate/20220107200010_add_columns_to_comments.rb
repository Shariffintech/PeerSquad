class AddColumnsToComments < ActiveRecord::Migration[6.1]
  def change
    rename_column :comments, :name, :title
    add_column :comments, :body, :string
    add_reference :comments, :strategy, index: true, foreign_key: true
  end
end
