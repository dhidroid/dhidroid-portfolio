import React from 'react';
import { Container } from '../ui/Container';
import { Plus } from 'lucide-react';

const ValueProp: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1]">
                Leverage the power of AI in{' '}
                <span className="inline-flex items-center align-middle mx-2">
                    <div className="flex -space-x-3">
                        {[1, 2].map(i => (
                             <img 
                                key={i}
                                src={`https://i.pravatar.cc/100?img=${i + 20}`} 
                                alt="User"
                                className="w-12 h-12 md:w-16 md:h-16 rounded-full border-4 border-white object-cover"
                             />
                        ))}
                    </div>
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-slate-900 border-4 border-white flex items-center justify-center text-white -ml-3 z-10">
                        <Plus className="w-6 h-6" />
                    </div>
                </span>
                {' '}high-performance development.
            </h2>
        </div>
      </Container>
    </section>
  );
};

export default ValueProp;
