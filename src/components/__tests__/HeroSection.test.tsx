
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HeroSection from "../HeroSection";

// Mock console.log to verify it's called
const originalConsoleLog = console.log;
const mockConsoleLog = jest.fn();

beforeAll(() => {
  console.log = mockConsoleLog;
});

afterAll(() => {
  console.log = originalConsoleLog;
});

describe("HeroSection", () => {
  it("renders the hero content correctly", () => {
    render(
      <BrowserRouter>
        <HeroSection />
      </BrowserRouter>
    );

    // Check if main elements are rendered
    expect(screen.getByText("Personalized Learning", { exact: false })).toBeInTheDocument();
    expect(screen.getByText("Adaptive lessons", { exact: false })).toBeInTheDocument();
    expect(screen.getByTestId("book-button")).toBeInTheDocument();
    expect(screen.getByText("Join Waitlist")).toBeInTheDocument();
  });

  it("triggers console.log when Book button is clicked", () => {
    render(
      <BrowserRouter>
        <HeroSection />
      </BrowserRouter>
    );

    // Click the Book a Tutor button
    fireEvent.click(screen.getByTestId("book-button"));

    // Verify console.log was called with "Book"
    expect(mockConsoleLog).toHaveBeenCalledWith("Book");
  });
});
