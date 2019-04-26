/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TodoComponentsPage, TodoDeleteDialog, TodoUpdatePage } from './todo.page-object';

const expect = chai.expect;

describe('Todo e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let todoUpdatePage: TodoUpdatePage;
    let todoComponentsPage: TodoComponentsPage;
    let todoDeleteDialog: TodoDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Todos', async () => {
        await navBarPage.goToEntity('todo');
        todoComponentsPage = new TodoComponentsPage();
        await browser.wait(ec.visibilityOf(todoComponentsPage.title), 5000);
        expect(await todoComponentsPage.getTitle()).to.eq('Todos');
    });

    it('should load create Todo page', async () => {
        await todoComponentsPage.clickOnCreateButton();
        todoUpdatePage = new TodoUpdatePage();
        expect(await todoUpdatePage.getPageTitle()).to.eq('Create or edit a Todo');
        await todoUpdatePage.cancel();
    });

    it('should create and save Todos', async () => {
        const nbButtonsBeforeCreate = await todoComponentsPage.countDeleteButtons();

        await todoComponentsPage.clickOnCreateButton();
        await promise.all([
            todoUpdatePage.setTitleInput('title'),
            todoUpdatePage.setCategoryInput('category'),
            todoUpdatePage.setDescriptionInput('description'),
            todoUpdatePage.setDueDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            todoUpdatePage.userSelectLastOption()
        ]);
        expect(await todoUpdatePage.getTitleInput()).to.eq('title');
        expect(await todoUpdatePage.getCategoryInput()).to.eq('category');
        expect(await todoUpdatePage.getDescriptionInput()).to.eq('description');
        expect(await todoUpdatePage.getDueDateInput()).to.contain('2001-01-01T02:30');
        const selectedIsCompleted = todoUpdatePage.getIsCompletedInput();
        if (await selectedIsCompleted.isSelected()) {
            await todoUpdatePage.getIsCompletedInput().click();
            expect(await todoUpdatePage.getIsCompletedInput().isSelected()).to.be.false;
        } else {
            await todoUpdatePage.getIsCompletedInput().click();
            expect(await todoUpdatePage.getIsCompletedInput().isSelected()).to.be.true;
        }
        await todoUpdatePage.save();
        expect(await todoUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await todoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Todo', async () => {
        const nbButtonsBeforeDelete = await todoComponentsPage.countDeleteButtons();
        await todoComponentsPage.clickOnLastDeleteButton();

        todoDeleteDialog = new TodoDeleteDialog();
        expect(await todoDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Todo?');
        await todoDeleteDialog.clickOnConfirmButton();

        expect(await todoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
