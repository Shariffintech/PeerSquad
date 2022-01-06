class StrategiesController < ApplicationController
    before_action :set_strategy, only: [:show, :update, :destroy]

    def index
        strategies = Strategy.all
        render json: StrategySerializer.new(strategies).to_serialized_json, include: [:strategy_categories, :comments]
    end

    def show
        strategy = Strategy.find_by(id: params[:id])
        ender json: StrategySerializer.new(strategy).to_serialized_json
    end

    def create
        @strategy = Strategy.create(strategy_params)
        if @strategy.save
            render json: StrategySerializer.new(strategy).to_serialized_json
        else
            render json: {error: @strategy.errors.full_messages}
        end
    end

    def update
        @strategy = Strategy.find_by(id: params[:id])
        if @strategy.update(strategy_params)
            render json: @strategy
        else
            render json: {error: @strategy.errors.full_messages}
        end
    end

    def destroy
        if @strategy
        @strategy.destroy
        render json: {message: "Successfully deleted strategy"}
        else
        render json: {message: "Strategy not found"}
        end
    end

    private

    def strategy_params
        params.require(:strategy).permit(:title, :description, :user_id, :strategy_category_id)
    end

    def set_strategy
        @strategy = Strategy.find_by(id: params[:id])
    end
   
end

class StrategySerializer
    def initialize(strategy_object)
        @strategy_object = strategy_object
    end

    def to_serialized_json
        @strategy_object.to_json
    end
end

