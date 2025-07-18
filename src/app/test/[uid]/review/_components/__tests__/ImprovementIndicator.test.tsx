import React from 'react'
import { render, screen } from '@testing-library/react'
import { ImprovementIndicator } from '../ImprovementIndicator'

describe('ImprovementIndicator', () => {
  it('should render improvement indicator with positive change', () => {
    render(
      <ImprovementIndicator
        currentScore={85}
        previousAverage={75}
        showIndicator={true}
      />
    )

    expect(screen.getByLabelText('Mejora del 13%')).toBeInTheDocument()
    expect(screen.getByText('+13')).toBeInTheDocument()
  })

  it('should render improvement indicator with negative change', () => {
    render(
      <ImprovementIndicator
        currentScore={65}
        previousAverage={80}
        showIndicator={true}
      />
    )

    expect(screen.getByLabelText('Empeoramiento del 19%')).toBeInTheDocument()
    expect(screen.getByText('-19')).toBeInTheDocument()
  })

  it('should not render when showIndicator is false', () => {
    render(
      <ImprovementIndicator
        currentScore={85}
        previousAverage={75}
        showIndicator={false}
      />
    )

    expect(screen.queryByLabelText('Mejora del 13%')).not.toBeInTheDocument()
    expect(screen.queryByText('+13')).not.toBeInTheDocument()
  })

  it('should not render when previousAverage is 0', () => {
    render(
      <ImprovementIndicator
        currentScore={85}
        previousAverage={0}
        showIndicator={true}
      />
    )

    expect(screen.queryByLabelText(/Mejora/)).not.toBeInTheDocument()
    expect(screen.queryByLabelText(/Empeoramiento/)).not.toBeInTheDocument()
  })

  it('should handle zero change correctly', () => {
    render(
      <ImprovementIndicator
        currentScore={75}
        previousAverage={75}
        showIndicator={true}
      />
    )

    expect(screen.getByLabelText('Empeoramiento del 0%')).toBeInTheDocument()
    expect(screen.getByText('-0')).toBeInTheDocument()
  })

  it('should format change as integer (no decimals)', () => {
    render(
      <ImprovementIndicator
        currentScore={83}
        previousAverage={80}
        showIndicator={true}
      />
    )

    expect(screen.getByLabelText('Mejora del 4%')).toBeInTheDocument()
    expect(screen.getByText('+4')).toBeInTheDocument()
  })

  it('should apply correct CSS classes for positive change', () => {
    render(
      <ImprovementIndicator
        currentScore={85}
        previousAverage={75}
        showIndicator={true}
      />
    )

    const indicator = screen.getByLabelText('Mejora del 13%')
    expect(indicator).toHaveClass('text-emerald-400')
    
    const percentageText = screen.getByText('+13')
    expect(percentageText).toHaveClass('text-emerald-400')
  })

  it('should apply correct CSS classes for negative change', () => {
    render(
      <ImprovementIndicator
        currentScore={65}
        previousAverage={80}
        showIndicator={true}
      />
    )

    const indicator = screen.getByLabelText('Empeoramiento del 19%')
    expect(indicator).toHaveClass('text-rose-400')
    
    const percentageText = screen.getByText('-19')
    expect(percentageText).toHaveClass('text-rose-400')
  })

  it('should handle very small changes', () => {
    render(
      <ImprovementIndicator
        currentScore={75.1}
        previousAverage={75}
        showIndicator={true}
      />
    )

    expect(screen.getByLabelText('Mejora del 0%')).toBeInTheDocument()
    expect(screen.getByText('+0')).toBeInTheDocument()
  })

  it('should handle large changes', () => {
    render(
      <ImprovementIndicator
        currentScore={100}
        previousAverage={50}
        showIndicator={true}
      />
    )

    expect(screen.getByLabelText('Mejora del 100%')).toBeInTheDocument()
    expect(screen.getByText('+100')).toBeInTheDocument()
  })

  it('should render with correct accessibility attributes', () => {
    render(
      <ImprovementIndicator
        currentScore={85}
        previousAverage={75}
        showIndicator={true}
      />
    )

    const indicator = screen.getByLabelText('Mejora del 13%')
    expect(indicator).toHaveAttribute('aria-label', 'Mejora del 13%')
  })
}) 