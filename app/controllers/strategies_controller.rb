class StrategiesController < ApplicationController
    before_action :set_strategy, except: [:create]

    def index
        # @attendances = @lecture.attendances
        strategies = Strategy.all
        render json: strategies

        
    end

    def show
        strategy = Strategy.find_by(id: params[:id])
        render json: strategy
        
    end


    def create
        @strategy = Strategy.new(strategy_params)
        if @strategy.save
            render json: @strategy, status: :created, location: @strategy
        else
            render json: @strategy.errors, status: :unprocessable_entity
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
        @strategy.destroy
    end

    private

    def strategy_params
        params.require(:strategy).permit(:name, :description, :tier, :category, :reference)
    end

    def set_strategy
        @strategy = Strategy.find_by(id: params[:id])
    end

   
end


# class StrategySerializer

#     def initialize(strategy_object)
#         @strategy_object = strategy_object
#     end

#     def to_serialized_json
#         @strategy_object.to_json
#     end
# end