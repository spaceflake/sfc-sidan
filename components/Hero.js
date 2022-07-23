const Hero = ({ session }) => {
  return (
    <div className="hero grow">
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content grow text-center text-neutral-content">
        <div className="max-w-md py-10">
          <h1 className="mb-5 text-6xl font-bold">Välkommen</h1>
          <p className="mb-5">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          {!session ? (
            <button className="btn btn-primary mt-8">Logga in</button>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  )
}

export default Hero
