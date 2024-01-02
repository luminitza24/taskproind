import React from 'react';
import styled from 'styled-components';
import { withTheme } from '@callstack/react-theme-provider';

const Header = ({ theme, themes, onChangeTheme }) => (
  <Container textColor={theme.textColor} background={theme.backgroundColor}>
    <div textColor={theme.textColor} background={theme.secondaryColor}>
      CHANGE THEME:{' '}
      <select onChange={e => onChangeTheme(e.target.value)}>
        {themes.map(themeName => (
          <option key={themeName} value={themeName}>
            {themeName}
          </option>
        ))}
      </select>
    </div>
  </Container>
);

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  color: ${props => props.textColor};
  background-color: ${props => props.background};
  padding: 1rem;
  text-align: center;
  font-family: sans-serif;
`;

export default withTheme(Header);
