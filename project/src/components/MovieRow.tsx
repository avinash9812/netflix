import React from 'react';
import { ChevronLeft, ChevronRight, Play, Plus, ThumbsUp } from 'lucide-react';
import { Movie } from '../types';

interface MovieRowProps {
  title: string;
  movies: Movie[];
}

const MovieRow: React.FC<MovieRowProps> = ({ title, movies }) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -current.offsetWidth : current.offsetWidth;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-2 px-12">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="group relative">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-0 z-40 h-full w-12 bg-black/30 opacity-0 transition group-hover:opacity-100"
        >
          <ChevronLeft className="mx-auto w-6 h-6" />
        </button>
        
        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-hidden scroll-smooth pb-4"
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="relative flex-none w-[250px] transition duration-300 hover:scale-105"
            >
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full aspect-[16/9] rounded-sm object-cover"
              />
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-black/70" />
                <div className="absolute inset-0 p-4 flex flex-col justify-between">
                  <h3 className="font-semibold">{movie.title}</h3>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <button className="p-1 bg-white rounded-full">
                        <Play className="w-4 h-4 text-black" />
                      </button>
                      <button className="p-1 border rounded-full">
                        <Plus className="w-4 h-4" />
                      </button>
                      <button className="p-1 border rounded-full">
                        <ThumbsUp className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-green-500">{movie.rating}% Match</span>
                      <span>{movie.duration}</span>
                    </div>
                    <div className="text-sm mt-1">{movie.genres.join(' • ')}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-0 z-40 h-full w-12 bg-black/30 opacity-0 transition group-hover:opacity-100"
        >
          <ChevronRight className="mx-auto w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default MovieRow;