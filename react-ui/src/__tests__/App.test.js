import React from "react";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import {fireEvent} from '@testing-library/react';

import App from '../App';

let container = null;

beforeEach(() => {
    // Configurar o elemento DOM como alvo da renderização
    container = document.createElement("div");
    document.body.append(container);
});

afterEach(() => {
    // Desmontar ao sair do teste
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("Renderiza a página inicial", () => {
    act(() => {
        render(<App/>, container);
    });

    const navButtonsTexts = [...container.querySelectorAll('nav ul li')].map(el => el.textContent);
    const expectedTexts = ["Início", "Entrar", "Sobre"];

    expect(container.querySelector(".app-name").textContent).toBe("Penshare");
    expect(navButtonsTexts.length).toBe(3);
    expect(navButtonsTexts).toEqual(expectedTexts);
});

it("Navega para a página de login", () => {
    act(() => {
        render(<App/>, container);
    });

    const navButtonLogin = container.querySelector('nav ul li:nth-child(2) a')
    act(() => {
        navButtonLogin.dispatchEvent(new MouseEvent("click", {bubbles: true}));
    })

    const loginTitle = container.querySelector('.login-title').textContent;

    expect(loginTitle).toBe("Faça login no Penshare");
});
