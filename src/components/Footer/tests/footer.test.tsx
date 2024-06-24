// Footer.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../footer';

it('renders footer component', () => {
    const { getByText } = render(<Footer />);

    expect(getByText('Clique duas vezes para editar uma tarefa')).toBeInTheDocument();
    expect(screen.getByText((content, element) => {
        return element?.textContent === 'Pressione Enter para confirmar alteração de título';
    })).toBeInTheDocument();
    expect(getByText('Projeto desenvolvido por Henrique Santiago Pires baseado no TodoMVC da')).toBeInTheDocument();
    expect(getByText('Desafio front-end júnior - enContact')).toBeInTheDocument();
    

    const logoImage = screen.getByAltText('Logo enContact') as HTMLImageElement;
    expect(logoImage).toBeInTheDocument();
    expect(logoImage.src).toContain('logoenContact.jpg');
});
