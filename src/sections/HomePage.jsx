import React from 'react'
import ArticleCard from '../Cards/ArticleCard'
import QuestionCard from '../Cards/QuestionCard'

export default function HomePage() {
  return (
    <div className='m-5 flex flex-col justify-center align-center'>
      <ArticleCard/>
      <QuestionCard/>
    </div>
  )
}
