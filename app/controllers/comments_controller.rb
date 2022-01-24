class CommentsController < ApplicationController
    before_action :get_strategy
    before_action :set_comment, only: [:show, :edit, :update, :destroy]

    def index
        comments = @strategy.comments
        render json: comments, include: [:strategy]
    end

    def show
        comment = Comment.find_by(id: params[:id])
    end

    def new
        @comment = @strategy.comments.build
    end

    def create
        
        @comment = @strategy.comments.build(comment_params)
        

        if @comment.save
            render json: @comment
        else
            render json: @comment.errors
        end

    end

    def update
        @comment = Comment.find_by(id: params[:id])
        if @comment.update(comment_params)
            render json: @comment
        else
            render json: {error: @comment.errors.full_messages}
        end
    end

    def destroy
        @comment.destroy
    end


    private
    def set_comment
        @comment = @strategy.comments.find(params[:id])
    end

    def get_strategy
        @strategy = Strategy.find(params[:strategy_id])
        
    end

    def comment_params
        params.require(:comment).permit(:title, :body, :strategy_id)
    end

    
end
