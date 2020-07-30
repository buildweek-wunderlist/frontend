import React from "react"
import styled from "styled-components"

const StyledCard = styled.div`
  border-radius: 15px;
  display: flex;
  max-width: 500px;
  margin: 10px auto;
  background-color: #81b29a;
  padding: 15px;
  width: 60%;

  .card-image {
    border-radius: 100%;
  }

  .card-content {
    justify-content: center;
    padding: 0 15px;
    color: #f4f1de;
    text-align: left;
  }

  &:hover {
    background-color: #e07a5f;
    transform: translate(0, -5px);
    transition-duration: 500ms;
  }
`

const Comments = (props) => {
  return (
    <div>
      <h2>See what users say about us:</h2>
      {props.comments.map((item) => {
        return (
          <StyledCard key={item.id} className="card">
            <img src={item.avatar} alt="user avatar" className="card-image" />
            <div className="card-content">
              <h4>{item.name}</h4>
              <p>{item.comments}</p>
            </div>
          </StyledCard>
        )
      })}
    </div>
  )
}

export default Comments
