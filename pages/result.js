function Result () {
  const slug = '8e6407bc-5b5b-4d7e-b189-607d8491ca4f'
  return (
    <div>
      <video
        src={`http://localhost:8000/api/v1/videos/${slug}.mp4`}
        controls
      />
    </div>
  )
}

export default Result
