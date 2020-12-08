import { render, screen, fireEvent } from '@testing-library/react';
import PokeDetails from './components/PokeDetails';
import utils from './utils';

describe("PokeDetails bag checkbox", () => {

    const updateBag = () => {}

    test ("should render PokeDetails", () => {
        render(<PokeDetails pokeDetails={{types: [], abilities: []}} pokeId={"1"} inBag={true} updateBag={updateBag} />);
    });

    test('should not  be checked', () => {
        render(<PokeDetails pokeDetails={{types: [], abilities: []}} pokeId={"1"} inBag={false} updateBag={updateBag} />);

        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).toBeInTheDocument();
        expect(checkbox).not.toBeChecked();
    });

    test('should be checked', () => {
        render(<PokeDetails pokeDetails={{types: [], abilities: []}} pokeId={"1"} inBag={true} updateBag={updateBag} />);

        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).toBeInTheDocument();
        expect(checkbox).toBeChecked();
    });

    test('should update bag when checked', () => {
        let bagUpdated = false;
        const updateBag = (a,b) => {
            // TODO: check values
            bagUpdated = true;
        }
        expect(bagUpdated).toEqual(false);
        render(<PokeDetails pokeDetails={{types: [], abilities: []}} pokeId={"1"} inBag={true} updateBag={updateBag} />);

        const checkbox = screen.getByRole("checkbox");
        fireEvent.click(checkbox);
        expect(bagUpdated).toEqual(true);
    });
});

describe("details caching", () => {
    let oldFetch;
    beforeAll(() => {
        oldFetch = fetch;
    });

    afterAll(() => {
        fetch = oldFetch;
    });

    test("should call fetch the first time", async () => {
        let called = false;
        fetch = () => {
            called = true;
            return (new Promise((res) => {
                res({json: ()=>"res"});
            }))
        };
        await utils.getDetails({id: "1"}, () => {});
        expect(called).toEqual(true);
    });

    test("should not call fetch the second time", async () => {
        let called = false;
        fetch = () => {
            called = true;
            return (new Promise((res) => {
                res({json: ()=>"res"});
            }))
        };
        await utils.getDetails({id: "1"}, () => {});
        expect(called).toEqual(false);
    });
});


