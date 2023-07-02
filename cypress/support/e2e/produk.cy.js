// function for separating currency amount (used in assertion below)
function numberSeparator(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

describe('Produk Test', ()=>{
    beforeEach(()=>{
        const email = "toko.cypress@gmail.com"
        const password = "123456"
        cy.login(email,password)
    });

    it('Add product', ()=>{
        cy.visit('/');
        // go to the Produk page
        cy.get('[href="/products"]').click();
        cy.url().should('include','/products');

        // click 'tambah' button
        cy.get('.css-1piskbq').click();

        // fill all required fields
        cy.get('#nama').type('macbook air m1');
        cy.get('#deskripsi').type('baru');
        cy.get('[id="harga beli"]').type("10000000");
        cy.get('[id="harga jual"]').type("12000000");
        cy.get('#stok').type("20");
        cy.get('#kategori').click();
        cy.get('.css-u3dlpe').click();

        // click 'simpan' button
        cy.get('.chakra-button').click();

        // assertion
        cy.get('.chakra-toast').should('be.visible');
        cy.get('.chakra-toast').find('#toast-1-title').should('have.text','success');
        cy.get('.chakra-toast').find('.css-zycdy9').should('have.text','item ditambahkan');

        // product must be on the products list
        cy.url({ timeout: 10000 }).should('include','/products');
        cy.get('.chakra-table').last().as('lastInput');
        cy.get('@lastInput').find('tbody tr').eq(0).find('td').eq(0).should('exist')
        cy.get('@lastInput').find('tbody tr').eq(0).find('td').eq(1).should('contain','macbook air m1')
        cy.get('@lastInput').find('tbody tr').eq(0).find('td').eq(2).should('contain','Umum')
        cy.get('@lastInput').find('tbody tr').eq(0).find('td').eq(3).should('contain',numberSeparator(10000000))
        cy.get('@lastInput').find('tbody tr').eq(0).find('td').eq(4).should('contain',numberSeparator(12000000))
        cy.get('@lastInput').find('tbody tr').eq(0).find('td').eq(5).should('contain','20')
    });

    it('Delete product', ()=>{
        cy.visit('/');
        cy.get('[href="/products"]').click();
        cy.url().should('include','/products');

        // delete last element of product
        cy.get('.chakra-table').last().find('tbody tr').eq(0).find('.chakra-button').click();
        cy.get('.chakra-table').last().find('tbody tr').eq(0).find('.chakra-menu__menu-list').contains('hapus').click({force:true});
        cy.get('.css-n45e6f').click();

        // assertion
        cy.get('.chakra-toast').should('be.visible');
        cy.get('.chakra-toast').find('#toast-1-title').should('have.text','success');
        cy.get('.chakra-toast').find('.css-zycdy9').should('have.text','item dihapus');
    });
});