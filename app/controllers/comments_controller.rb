class CommentsController < ApplicationController
    before_action :set_comment, only: [:show, :edit, :update, :destroy]

    def index
        strategies = Comment.all
        # render json: CommentSerializer.new(comments, include: [:strategies]).to_serialized_json
    end

    def show
        comment = Comment.find_by(id: params[:id])
       
        if comment == nil
            # redirect to create method
            redirect_to :create
        else
            render json: comment
        end
        
    end

    def create
        @comment = Comment.new(comment_params)
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

    def comment_params
        params.require(:comment).permit(:title, :body, :strategy_id)
    end

    def set_comment
        @comment = Comment.find_by(id: params[:id])
    end
end
