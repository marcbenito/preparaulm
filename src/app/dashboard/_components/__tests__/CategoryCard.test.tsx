import { render, screen } from "@testing-library/react"
import { CategoryCard } from "../CategoryCard"
import { Category } from "../Types"

const mockCategory: Category = {
  name: "Meteorología",
  slug: "meteorologia",
  iconName: "Cloud",
  questions: 100,
  completed: 75,
  score: 85,
  color: "from-sky-500 to-blue-500",
  confidence: 4,
  minProgress: 75,
}

describe("CategoryCard", () => {
  it("should render category name and score", () => {
    render(<CategoryCard category={mockCategory} index={0} />)

    expect(screen.getByText("Meteorología")).toBeDefined()
    expect(screen.getByText("85%")).toBeDefined()
    expect(screen.getByText("Nota media (ult.tests)")).toBeDefined()
  })

  it("should show progress bar when minProgress is less than 100", () => {
    render(<CategoryCard category={mockCategory} index={0} />)

    expect(screen.getByText("Recopilando datos")).toBeDefined()
    expect(screen.getByText("75%")).toBeDefined()
  })

  it("should show confidence meter when minProgress is 100", () => {
    const categoryWithConfidence = {
      ...mockCategory,
      minProgress: 100,
      confidence: 3,
    }

    render(<CategoryCard category={categoryWithConfidence} index={0} />)

    expect(screen.getByText("Confianza")).toBeDefined()
    expect(screen.getByText("Buena")).toBeDefined()
  })

  it("should render component without errors", () => {
    const { container } = render(
      <CategoryCard category={mockCategory} index={0} />,
    )
    expect(container.firstChild).toBeDefined()
  })

  it("should show 'Recopilando datos 0%' when no performance data exists", () => {
    const categoryWithoutData = {
      ...mockCategory,
      minProgress: 0,
      confidence: 0,
    }

    render(<CategoryCard category={categoryWithoutData} index={0} />)

    expect(screen.getByText("Recopilando datos")).toBeDefined()
    expect(screen.getByText("0%")).toBeDefined()
  })
})
