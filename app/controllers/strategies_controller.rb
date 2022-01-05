class StrategiesController < ApplicationController

    def index
        strategies = Strategy.all
        render json: StrategySerializer.new(strategies).to_serialized_json
    end

    def show
        strategy = Strategy.find_by(id: params[:id])
        ender json: StrategySerializer.new(strategy).to_serialized_json
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

