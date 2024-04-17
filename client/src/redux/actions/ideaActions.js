import { setIdea, setIdeas, setLoading, setError, setPagination, resetError } from "../slices/idea";
  import axios from "axios";
  
  export const getIdeas = (page, favoriteToggle) => async (dispatch) => {
    dispatch(setLoading());
      try {
          const { data } = await axios.get(`/api/ideas/${page}/${10}`);
          console.log(data)
      const { ideas, pagination } = data;
      dispatch(setIdeas(ideas));
      dispatch(setPagination(pagination));
    } catch (error) {
      dispatch(
        setError(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
              ? error.message
              : "An unexpected error has occured. Please try again later."
        )
      );
    }
  };
  
  
  export const getIdea = (id) => async (dispatch) => {
      dispatch(setLoading(true));
      try {
          const { data } = await axios.get(`/api/ideas/${id}`);
          dispatch(setIdea(data));
      } catch (error) {
          dispatch(
              setError(
                  error.response && error.response.data.message
                      ? error.response.data.message
                      : error.message
                      ? error.message
                      : 'An expected error has occured. Please try again later.'
              )
          );
      }
  };
  
export const createIdeaReview = (ideaId, comment, rating, userName) => async (dispatch, getState) => {
      try {
          await axios.post(`/api/ideas/reviews/${ideaId}`, { comment, rating, userName });
        
      } catch (error) {
          dispatch(
              setError(
                  error.response && error.response.data.message
                      ? error.response.data.message
                      : error.message
                      ? error.message
                      : 'An expected error has occured. Please try again later.'
              )
          );
      }
  };
  
